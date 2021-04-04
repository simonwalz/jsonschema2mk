<a name="root"></a>
# osiota application modbus

This application connects devices via Modbus.


**Additional Properties:** not allowed<br/>
<br>**Option 1 (alternative):** 
Modbus Serial Interface


**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**connect\_type**<br/>(Connection Type)|`string`|Enum: `"RTU"`, `"C701"`, `"RTUBuffered"`, `"AsciiSerial"`<br/>||
|**connect\_path**|`string`|i.e. device path<br/>||
|[**connect\_options**](#option1connect_options)<br/>(Serial Connect Options)|`object`|||
|[**map**](#option1map)<br/>(Modbus devices)|`object[]`|||

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


<br>**Option 2 (alternative):** 
Modbus Network Interface


**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**connect\_type**<br/>(Connection Type)|`string`|Enum: `"TCP"`, `"Telnet"`<br/>||
|**connect\_path**<br/>(Host)|`string`|i.e. an IP address or host name<br/>||
|[**connect\_options**](#option2connect_options)<br/>(Network Connect Options)|`object`|||
|[**map**](#option2map)<br/>(Modbus devices)|`object[]`|||

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


<a name="option1connect_options"></a>
## Option 1: connect\_options: Serial Connect Options

**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**baudRate**<br/>(Baud rate)|`number`|||

<a name="option1map"></a>
## Option 1: map: Modbus devices

**Items**

**Item Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**node**<br/>(Node to map to)|`string`||no|
|**id**<br/>(Modbus Client ID)|`number`|Minimum: `0`<br/>|yes|
|**address**<br/>(Modbus Field Address)|`number`|Minimum: `0`<br/>|yes|
|**type**<br/>(Modbus Field Type)|`string`|Enum: `"input boolean"`, `"input register"`, `"output boolen"`, `"output register"`<br/>|no|
|**datatype**<br/>(Field Data Type)|`string`|Default: `"uint16"`<br/>Enum: `"boolean"`, `"uint16"`<br/>|yes|
|[**metadata**](#option1mapmetadata)<br/>(Node Metadata)|`object`||no|

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

<a name="option1mapmetadata"></a>
### Option 1: map\.metadata: Node Metadata

**Additional Properties:** allowed<br/>
<a name="option2connect_options"></a>
## Option 2: connect\_options: Network Connect Options

**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**port**|`number`|||

<a name="option2map"></a>
## Option 2: map: Modbus devices

**Items**

**Item Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**node**<br/>(Node to map to)|`string`||no|
|**id**<br/>(Modbus Client ID)|`number`|Minimum: `0`<br/>|yes|
|**address**<br/>(Modbus Field Address)|`number`|Minimum: `0`<br/>|yes|
|**type**<br/>(Modbus Field Type)|`string`|Enum: `"input boolean"`, `"input register"`, `"output boolen"`, `"output register"`<br/>|no|
|**datatype**<br/>(Field Data Type)|`string`|Default: `"uint16"`<br/>Enum: `"boolean"`, `"uint16"`<br/>|yes|
|[**metadata**](#option2mapmetadata)<br/>(Node Metadata)|`object`||no|

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

<a name="option2mapmetadata"></a>
### Option 2: map\.metadata: Node Metadata

**Additional Properties:** allowed<br/>

