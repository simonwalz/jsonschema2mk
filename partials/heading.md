{{#if path~}}
{{br}}
<a name="{{{tolink path}}}"></a>
{{/if~}}
{{print_level level}}{{#if path}} {{escape path}}:{{/if}} {{escape (or title (or type 'any'))}}
