# object

**Properties (Pattern)**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|[**^\(?\!\.\*doesnotcontain\)\.\*$**](#doesnotcontain)<br/>(Database)|`object`|Settings for the database<br/>||

**Additional Properties:** not allowed   
   
<a name="doesnotcontain"></a>
## ^\(?\!\.\*doesnotcontain\)\.\*$: Database

Settings for the database


   
**Option 1 (alternative):** 
SQL


**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**type**|`string`|type<br/>Enum: `"mysql"`, `"oracle"`, `"postgresql"`<br/>|yes|
|**host**|`string`|host<br/>|yes|

**Additional Properties:** not allowed   
**Example**

```json
{
    "hallo": {
        "type": "postgresql",
        "host": "localhost"
    }
}
```


   
**Option 2 (alternative):** 
Cassandra


**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**type**|`string`|type<br/>Enum: `"cassandra"`<br/>|yes|
|[**hosts**](#doesnotcontainhosts-option2)|`string[]`|hosts<br/>|yes|

**Additional Properties:** not allowed   
**Example**

```json
{
    "welt": {
        "type": "cassandra",
        "hosts": [
            "localhost"
        ]
    }
}
```


   
<a name="doesnotcontainhosts-option2"></a>
### ^\(?\!\.\*doesnotcontain\)\.\*$\.hosts\[\]: array (Option 2)

hosts


**Items: Cassandra node**

**Item Type:** `string`   

