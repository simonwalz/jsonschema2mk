{{debug "simple" .~}}
{{~#if (isdefined type)~}}
**{{prefix_text}}Type:** {{code type}}{{br}}
{{/if~}}
{{> extra .}}
{{~debug "/simple" .~}}
