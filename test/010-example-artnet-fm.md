---
parent: Reference
nav_order: 1
---

# osiota application artnet

This application allows controlling lights over the Art-Net protocol.


**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**host**|`string`|Default: `"255.255.255.255"`<br/>||
|**port**|`number`|Default: `6454`<br/>||
|**refresh\_rate**|`number`|in ms<br/>Default: `4000`<br/>||
|**universe**<br/>(ArtNet universe)|`number`|||
|**iface**<br/>(Interface)|`string`|Interface to bind the Art-Net socket to<br/>||
|[**map**](#map)<br/>(DMX channels)|`object[]`|||

**Additional Properties:** not allowed  
**Example**

```yaml
host: 192.0.2.42
port: 6454
refresh_rate: 4000
universe: 0
iface: eth0
map:
  - channel: 1
    node: /my-artnet-channel
    default_value: 63

```

<a name="map"></a>
## map\[\]: DMX channels

**Items: DMX channel**

**Item Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**channel**|`number`|Minimum: `1`<br/>Maximum: `512`<br/>||
|**node**<br/>(Node Name)|`string`|||
|**default\_value**|`number`|Minimum: `0`<br/>Maximum: `255`<br/>||

**Item Additional Properties:** not allowed  
**Example**

```yaml
- channel: 1
  node: /my-artnet-channel
  default_value: 63

```


