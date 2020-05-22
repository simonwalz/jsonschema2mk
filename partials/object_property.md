|{{#mylink .}}{{escape name}}{{/mylink}}|{{{or description title}}}|{{escape display_type}}|{{#each (get_examples .)}}{{jsoninline .}} {{/each}}|
