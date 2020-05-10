<a name="{{{path_id}}}"></a>
{{{mdlevel path}}} {{#if path}}{{escape path}}: {{/if}}{{escape title}}
{{#if description}}

{{{description}}}
{{/if}}
{{#if simple}}
{{> simple simple}}
{{/if}}
{{#if object}}

{{> object object}}
{{/if}}{{#if array}}

{{> array array}}
{{/if}}
{{#each examples}}

{{> example}}
{{/each}}
