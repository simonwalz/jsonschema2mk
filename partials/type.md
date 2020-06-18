{{#if (equal type "object") ~}}
{{> object . ~}}
{{else~}}
{{#if (equal type "array") ~}}
{{> array . ~}}
{{else~}}
{{> simple ~}}
{{/if ~}}
{{/if ~}}
