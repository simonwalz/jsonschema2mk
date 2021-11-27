{{#if (is_type type "object") ~}}
{{> object . ~}}
{{~else~}}
{{#if (is_type type "array") ~}}
{{> array . ~}}
{{~else~}}
{{> simple key=@key ~}}
{{/if ~}}
{{/if ~}}
{{#if $ref ~}} Reference to [{{escape $ref}}]({{escape $ref}}) {{/if}} 



{{#each oneOf}}
- **Option {{plus @key 1}} (alternative):** 
    {{~#if subschema~}}
    {{> schemaref_part . path=(pathjoinobj ../path @key . ) ~}}
    {{~else~}}
    {{> element_part . type=(or type ../type) path=(pathjoin path (plus "Option " (plus (plus @key 1) ": ")))}}
    {{~/if~}}
{{/each}}

{{#each anyOf}}
- **Option {{plus @key 1}} (optional):**  
    {{~#if subschema~}}
    {{> schemaref_part . path=(pathjoinobj ../path @key . ) ~}}
    {{~else~}}
    {{> element_part . type=(or type ../type) path=(pathjoin path (plus "Option " (plus (plus @key 1) ": ")))}}
    {{~/if~}}
{{/each}}

{{#each allOf}}
-  {{~#if subschema~}}
    {{> schemaref_part . path=(pathjoinobj ../path @key . ) ~}}
    {{~else~}}
    {{> element_part . type=(or type ../type) path=(pathjoin path (plus "Option " (plus (plus @key 1) ": ")))}}
    {{~/if~}}
{{/each}}

{{#each not}}
- **Not [{{plus @key 1}}]:**  
    {{~#if subschema~}}
    {{> schemaref_part . path=(pathjoinobj ../path @key . ) ~}}
    {{~else~}}
    {{> element_part . type=(or type ../type) path=(pathjoin path (plus "Option " (plus (plus @key 1) ": ")))}}
    {{~/if~}}
{{/each}}

{{#if (noproperties .)}}
**No properties.**
{{/if}}
