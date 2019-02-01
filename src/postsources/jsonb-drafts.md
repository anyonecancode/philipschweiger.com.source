---
path: "/posts/jsonb-drafts"
date: "2019-01-20"
title: "Json in Postgres Use Case: Saving Drafts"
blurb: "SQL vs NoSQL is sometimes a question when"
---

Let's say we have an application where it generally makes sense to use a relational database. For instance, say we're running a coffee shop and our system takes care of managing inventory. We put this data to a lot of different uses, from customer-facing ones like displaying a menu to business-related purposes like deciding what what to include in next week's order. A relational database is a nice fit here as it gives us the flexibility to query on different combinations of attributes.

A coffee cake might have these attributes:

```yaml
Name: Can't Resist Coffee Cake
Category: Food
Sub_Category: Baked Goods
Supplier: Pop Up Cafe Supply Co.
Cost: 2.00 USD
Customer Price: 3.50 USD
Description: One of our best sellers, this perfectly-textured,
  just-the-right-sweetness coffee cake is the perfect accompaniment
  to your morning joe!
```

(Having only ever eaten at bakeries rather than worked at one, I'm sure my prices here are off, and that there'd be other attributes such as nutritional information we'd want to include, but this should work for illustrative purposes.)

Translating this to a database table, we might get a schema like this:

```sql
 Table "goods"
     Column     |          Type
----------------+------------------------+
 id             | integer                |
 category       | integer                |
 sub_cat        | integer                |
 supplier       | integer                |
 cost_amt       | numeric(10,2)          |
 cost_curr      | currency               |
 customer_price | numeric(10,2)          |
 customer_curr  | currency               |
 name           | character varying(128) |
 description    | text                   |
Indexes:
    "goods_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "category" FOREIGN KEY (category) REFERENCES categories(id)
    "sub_cat" FOREIGN KEY (sub_cat) REFERENCES sub_categories(id)
    "supplier" FOREIGN KEY (supplier) REFERENCES suppliers(id)
```

And the entry like this:

```sql
-[ RECORD 1 ]--+----------------------------------------------------------------------------------------------------------------------------------------
id             | 1
category       | 1
sub_cat        | 4
supplier       | 42
cost_amt       | 2.00
cost_curr      | USD
customer_price | 3.50
customer_curr  | USD
name           | Can't Resist Coffee Cake
description    | One of our best sellers, this perfectly-textured just-the-right-sweetness coffee cake is the perfect accompaniment to your morning joe!
```


Everything seems in order. The current state of our inventory is in an easily queryable, nicely normalized form. Assuming we also have tables to record orders placed, items sold, and so forth, the past state of our inventory is also accessible.

What about that description field, though? As I noted at the start of this post, in this example this system not only helps us manage business processes like inventory tracking, it also powers the menu. If we change the description in our current approach, that will instantly flow through to the menu as well. Maybe that's what we want, but it puts a lot of pressure on whoever is editing that description—don't hit "save" until the description is exactly right!

What we need is a "drafts" table to store data-in-progress that we don't want reflected across the rest of our system yet. What should this table look like? Maybe we should just copy over the `goods` table and add a few columns specific to tracking drafts:

```sql
 Table "goods_drafts"
     Column     |          Type
----------------+--------------------------+
 draft_id       | integer                  |
 good_id        | integer                  |
 category       | integer                  |
 sub_cat        | integer                  |
 supplier       | integer                  |
 cost_amt       | numeric(10,2)            |
 cost_curr      | currency                 |
 customer_price | numeric(10,2)            |
 customer_curr  | currency                 |
 name           | character varying(128)   |
 description    | text                     |
 created        | timestamp with time zone |
Indexes:
    "goods_drafts_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
     goods_drafts_good_id_fkey" FOREIGN KEY (good_id) REFERENCES goods(id)
    "category" FOREIGN KEY (category) REFERENCES categories(id)
    "sub_cat" FOREIGN KEY (sub_cat) REFERENCES sub_categories(id)
    "supplier" FOREIGN KEY (supplier) REFERENCES suppliers(id)
```

This works but feels a bit heavy. Do we really need to duplicate all the columns from the `goods` table? We never query on or update those columns when working with drafts. A draft is essentially immutable—we store any changes as a brand new entry in the table and we only ever read, not modify, previous versions.

Put another way, there's nothing especially _relational_ about a draft. Normalizing our database schema makes it easier to sort, filter, and aggregate, but these use cases don't apply here. All we really want to do when saving a draft is to store the state of the record at that point in time, as a "blob" of data, if you will.

Applying this insight, let's take a different approach. Instead of replicating the `goods` table in `goods_drafts`, we can just store the contents of the draft as a JSON object:

```sql
Table "public.goods_drafts"
  Column  |            Type             |
----------+-----------------------------+
 draft_id | bigint                      |
 good_id  | integer                     |
 draft    | jsonb                       |
 created  | timestamp with time zone    |
Indexes:
    "goods_drafts_pkey" PRIMARY KEY, btree (draft_id)
Foreign-key constraints:
    "goods_drafts_good_id_fkey" FOREIGN KEY (good_id) REFERENCES goods(id)
```

PostgreSQL actually [offers](https://www.postgresql.org/docs/current/datatype-json.html) two JSON types: `json` and `jsonb`. The `json` type is essentially just a variant on the `text` type with some additional validation, whereas `jsonb` internally converts the values of JSON fields to their equivalent PostgreSQL data types. This makes for much more efficient storage and enable indexing and [containment testing](https://www.postgresql.org/docs/current/datatype-json.html#JSON-CONTAINMENT). As the documentation puts it, "In general, most applications should prefer to store JSON data as jsonb, unless there are quite specialized needs, such as legacy assumptions about ordering of object keys."

This flexibility is a really nice feature of PostgreSQL, allowing us to tailor our data storage strategy to different use cases within the same database. We can represent our data as JSON while we're editing it (which our UI layer is probably already doing anyway), then take full advantage of the traditional relational approach once our data is "live." As an added bonus, we've even accidentally added support for an "undo" feature in the UI—to restore a previous state, simply retrieve the JSON for an earlier version of the draft.

JSON + PostgreSQL: Letting us have our relational cake and eat NoSQL too ;-)
