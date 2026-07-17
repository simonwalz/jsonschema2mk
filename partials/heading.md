{{#if path~}}
{{br}}
<a name="{{{tolink (or link path)}}}"></a>
{{/if~}}
{{print_level level}}
    {{~#if path}} {{escape path}}:{{/if}} {{escape (or title (or type 'any'))}}
    {{~#if pathpost}} ({{#each pathpost}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}){{/if}}
