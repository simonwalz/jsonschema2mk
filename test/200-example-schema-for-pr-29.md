# Deployment Pipeline Schema \(inspired for PR \#29\)

**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|[**deployment**](#deployment)<br/>(Deployment Configuration)|`object`|Configure deployment execution<br/>||

**Example**

```json
{
    "deployment": {
        "kubernetes": {}
    }
}
```

   
<a name="deployment"></a>
## deployment: Deployment Configuration

Configure deployment execution


**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|[**kubernetes**](#deploymentkubernetes)<br/>(Kubernetes Deployments)|`object`|Run Kubernetes-based deployments<br/>||

**Example**

```json
{
    "kubernetes": {}
}
```

   
<a name="deploymentkubernetes"></a>
### deployment\.kubernetes: Kubernetes Deployments

Run Kubernetes-based deployments


   
**All of 1:**

Deployment execution options


   
**Option 1 (optional):** 
**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**manifestFile**<br/>(Deployment Manifest)|`string`|YAML manifest file for deployment<br/>|yes|


   
**Option 2 (optional):** 
**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|[**deploymentSteps**](#option2deploymentsteps)|`object[]`|Ordered list of deployment steps<br/>|yes|

**Example**

```json
{
    "deploymentSteps": [
        {}
    ]
}
```


   
**All of 2:**

**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|[**healthChecks**](#allof2healthchecks)<br/>(Health Check Steps)|`object[]`|Steps to verify deployment health<br/>||

**Example**

```json
{
    "healthChecks": [
        {}
    ]
}
```

   
<a name="option2deploymentsteps"></a>
#### Option 2: deploymentSteps\[\]: Deployment Steps

Ordered list of deployment steps


**Items**

**No properties.**

**Example**

```json
[
    {}
]
```

   
<a name="allof2healthchecks"></a>
#### All of 2: healthChecks\[\]: Health Check Steps

Steps to verify deployment health


**Items**

**No properties.**

**Example**

```json
[
    {}
]
```


