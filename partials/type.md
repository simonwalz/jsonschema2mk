{{debug "type" .~}}
{{#if (noproperties .)~}}
{{#if required~}}
**Required Properties:**

{{#each required}}
{{li}}{{this}}
{{/each~}}
{{else~}}
**No properties.**

{{/if~}}
{{/if~}}
{{#if (is_type type "object") ~}}
{{> object . ~}}
{{~else~}}
{{#if (is_type type "array") ~}}
{{> array . ~}}
{{~else~}}
{{> simple . ~}}
{{/if ~}}
{{/if ~}}

{{~#each oneOf~}}
{{br}}
**Option {{plus @key 1}} (alternative):** {{> element_part . type=(or type ../type) path=(pathjoin path (plus "Option " (plus (plus @key 1) ": "))) level=../level}}
{{/each~}}
{{#each anyOf~}}
{{br}}
**Option {{plus @key 1}} (optional):** {{> element_part . type=(or type ../type) path=(pathjoin path (plus "Option " (plus (plus @key 1) ": "))) level=../level}}
{{/each~}}
{{#each allOf~}}
{{br}}
**All of {{plus @key 1}}:**
{{> element_part . type=(or type ../type) path=(pathjoin path (plus "All of " (plus (plus @key 1) ": "))) level=../level}}
{{/each~}}
{{#each not~}}
{{br}}
**Not [{{plus @key 1}}]:** {{> element_part . type=(or type ../type) path=(pathjoin path (plus "not[" (plus (plus @key 1) "]: "))) level=../level}}
{{/each~}}
{{#if if~}}
{{br}}
{{explain if type}}

{{#if (isdefined then)~}}
**THEN**

{{#if then~}}
{{> element_part then type=(or then.type type) path=(pathjoin path "then") level=level}}
{{else~}}
never valid.
{{/if}}

{{/if~}}
{{#if (isdefined else)~}}
**OTHERWISE**

{{#if else~}}
{{> element_part else type=(or then.type type) path=(pathjoin path "else") level=level}}
{{else~}}
never valid.
{{/if~}}

{{/if~}}
{{/if~}}
{{~debug "/type" .~}}
