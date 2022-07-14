# osiota application artnet

This application allows controlling lights over the Art-Net protocol.


**Properties**

|Name|Type|Title|Description|Required|
|----|----|-----|-----------|--------|
|**host**|`string`|Host|Default: `"255.255.255.255"`<br/>||
|**port**|`number`|Port|Default: `6454`<br/>||
|**refresh\_rate**|`number`|Refresh Rate|in ms<br/>Default: `4000`<br/>||
|**universe**|`number`|ArtNet universe|||
|**iface**|`string`|Interface|Interface to bind the Art-Net socket to<br/>||
|[**map**](#map)|`object[]`|DMX channels|||

**Additional Properties:** not allowed  
**Example**

```json
{
    "host": "192.0.2.42",
    "port": 6454,
    "refresh_rate": 4000,
    "universe": 0,
    "iface": "eth0",
    "map": [
        {
            "channel": 1,
            "node": "/my-artnet-channel",
            "default_value": 63
        }
    ]
}
```

<a name="map"></a>
## map\[\]: DMX channels

**Items: DMX channel**

**Item Properties**

|Name|Type|Title|Description|Required|
|----|----|-----|-----------|--------|
|**channel**|`number`|Channel|Minimum: `1`<br/>Maximum: `512`<br/>||
|**node**|`string`|Node Name|||
|**default\_value**|`number`|Default Value|Minimum: `0`<br/>Maximum: `255`<br/>||

**Item Additional Properties:** not allowed  
**Example**

```json
[
    {
        "channel": 1,
        "node": "/my-artnet-channel",
        "default_value": 63
    }
]
```


