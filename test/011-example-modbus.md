<a name="root"></a>
# osiota application modbus

This application connects devices via Modbus.


**Additional Properties:** not allowed<br/>
<br>**Option 1 (alternative):** 
Modbus Serial Interface


**Properties**

|Name|Description|Type|
|----|-----------|----|
|`connect_type` (Connection Type)|Enum: `["RTU","C701","RTUBuffered","AsciiSerial"]`<br/>|string|
|`connect_path`|i.e. device path<br/>|string|
|[`connect_options`](#option1connect_options) (Serial Connect Options)||object|
|[`map`](#definitionsmap) (Modbus devices)||object\[\]|

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

|Name|Description|Type|
|----|-----------|----|
|`connect_type` (Connection Type)|Enum: `["TCP","Telnet"]`<br/>|string|
|`connect_path` (Host)|i.e. an IP address or host name<br/>|string|
|[`connect_options`](#option2connect_options) (Network Connect Options)||object|
|[`map`](#definitionsmap) (Modbus devices)||object\[\]|

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

|Name|Description|Type|
|----|-----------|----|
|`baudRate` (Baud rate)||number|

<a name="definitionsmap"></a>
## definitions/map: Modbus devices

**Items**

**Item Properties**

|Name|Description|Type|
|----|-----------|----|
|`node` (Node to map to)||string|
|`id` (Modbus Client ID)|Minimum: `0`<br/>|number|
|`address` (Modbus Field Address)|Minimum: `0`<br/>|number|
|`type` (Modbus Field Type)|Enum: `["input boolean","input register","output boolen","output register"]`<br/>|string|
|`datatype` (Field Data Type)|Default: `"uint16"`<br/>Enum: `["boolean","uint16"]`<br/>|string|
|[`metadata`](#definitionsmapmetadata) (Node Metadata)||object|

**Item Required Properties:** id,address,datatype<br/>
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

**Additional Properties:** allowed<br/>
<a name="option2connect_options"></a>
## Option 2: connect\_options: Network Connect Options

**Properties**

|Name|Description|Type|
|----|-----------|----|
|`port`||number|


