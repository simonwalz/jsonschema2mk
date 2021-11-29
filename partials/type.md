{{#if (is_type type "object") ~}}
{{> object . ~}}
{{~else~}}
{{#if (is_type type "array") ~}}
{{> array . ~}}
{{~else~}}
{{> simple ~}}
{{/if ~}}
{{/if ~}}
{{#if title ~}} 
    <br/>
    {{escape title}} 
    <br/>
{{/if ~}}
{{#if description ~}}
    <br/>
     Description: {{escape description}} 
    <br/>{{/if ~}}
{{#if $ref ~}} 
    <br/>
    Reference to [{{escape $ref}}]({{escape $ref}}) 
    <br/>
{{/if ~}} 

{{#each oneOf}}
<br>**Option {{plus @index 1}} (alternative):** {{> element_part . type=(or type ../type) path=(pathjoin path (plus "Option " (plus (plus @index 1) ": ")))}}
{{/each}}
{{#each anyOf}}
<br>**Option {{plus @key 1}} (optional):** {{> element_part . type=(or type ../type) path=(pathjoin path (plus "Option " (plus (plus @key 1) "]: ")))}}
{{/each}}
{{#each allOf}}
<br>{{> element_part . type=(or type ../type) path=(pathjoin path @key)}}
{{/each}}
{{#each not}}
<br>**Not [{{plus @key 1}}]:** {{> element_part . type=(or type ../type) path=(pathjoin path (plus "not[" (plus (plus @key 1) "]: ")))}}
{{/each}}
{{#if (noproperties .)}}
**No properties.**
{{/if}}
