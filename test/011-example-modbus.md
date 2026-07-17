# osiota application modbus

This application connects devices via Modbus.


**Additional Properties:** not allowed   
   
**Option 1 (alternative):** 
Modbus Serial Interface


**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**connect\_type**<br/>(Connection Type)|`string`|Enum: `"RTU"`, `"C701"`, `"RTUBuffered"`, `"AsciiSerial"`<br/>||
|**connect\_path**|`string`|i.e. device path<br/>||
|[**connect\_options**](#connect_options-option1)<br/>(Serial Connect Options)|`object`|||
|[**map**](#definitionsmap)<br/>(Modbus devices)|`object[]`|||

**Example**

```json
{
    "connect_type": "RTUBuffered",
    "connect_path": "/dev/ttyUSB0",
    "connect_options": {
        "baudRate": 9600
    }
}
```


   
**Option 2 (alternative):** 
Modbus Network Interface


**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**connect\_type**<br/>(Connection Type)|`string`|Enum: `"TCP"`, `"Telnet"`<br/>||
|**connect\_path**<br/>(Host)|`string`|i.e. an IP address or host name<br/>||
|[**connect\_options**](#connect_options-option2)<br/>(Network Connect Options)|`object`|||
|[**map**](#definitionsmap)<br/>(Modbus devices)|`object[]`|||

**Example**

```json
{
    "connect_type": "Telnet",
    "connect_path": "192.168.1.101",
    "connect_options": {
        "port": 1234
    }
}
```


   
<a name="connect_options-option1"></a>
## connect\_options: Serial Connect Options (Option 1)

**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**baudRate**<br/>(Baud rate)|`number`|||

   
<a name="connect_options-option2"></a>
## connect\_options: Network Connect Options (Option 2)

**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**port**|`number`|||

   
<a name="definitionsmap"></a>
## definitions/map: Modbus devices

**Items**

**Item Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**node**<br/>(Node to map to)|`string`||no|
|**id**<br/>(Modbus Client ID)|`number`|Minimum: `0`<br/>|yes|
|**address**<br/>(Modbus Field Address)|`number`|Minimum: `0`<br/>|yes|
|**type**<br/>(Modbus Field Type)|`string`|Enum: `"input boolean"`, `"input register"`, `"output boolen"`, `"output register"`<br/>|no|
|**datatype**<br/>(Field Data Type)|`string`|Default: `"uint16"`<br/>Enum: `"boolean"`, `"uint16"`<br/>|yes|
|[**metadata**](#definitionsmapmetadata)<br/>(Node Metadata)|`object`||no|

**Example**

```json
[
    {
        "node": "/Lamp Switch",
        "id": 0,
        "address": 10,
        "type": "output boolean",
        "datatype": "boolean",
        "metadata": {
            "power": 60
        }
    }
]
```

   
<a name="definitionsmapmetadata"></a>
### definitions/map\.metadata: Node Metadata

**Additional Properties:** allowed   

