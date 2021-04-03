<a name="root"></a>
# osiota application artnet

This application allows controlling lights over the Art-Net protocol.


**Properties**

|Name|Description|Type|
|----|-----------|----|
|`host`|Default: `"255.255.255.255"`<br/>|string|
|`port`|Default: `6454`<br/>|number|
|`refresh_rate`|in ms<br/>Default: `4000`<br/>|number|
|`universe` (ArtNet universe)||number|
|`iface` (Interface)|Interface to bind the Art-Net socket to<br/>|string|
|[`map`](#map) (DMX channels)||object\[\]|

**Additional Properties:** not allowed<br/>
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

|Name|Description|Type|
|----|-----------|----|
|`channel`|Minimum: `1`<br/>Maximum: `512`<br/>|number|
|`node` (Node Name)||string|
|`default_value`|Minimum: `0`<br/>Maximum: `255`<br/>|number|

**Item Additional Properties:** not allowed<br/>
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


