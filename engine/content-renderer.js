"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer
   Professional Content Renderer
   ========================================================================== */

const ContentRenderer = {

    render(text = ""){

        if(!text.trim()){

            return "";

        }

        let html = text.trim();

        const codeBlocks = [];
        const inlineCodes = [];

        /* ------------------------------------------------------------------
           Escape HTML
        ------------------------------------------------------------------ */

        html = html
            .replace(/&/g,"&amp;")
            .replace(/</g,"&lt;")
            .replace(/>/g,"&gt;");

        /* ------------------------------------------------------------------
           Code Blocks
        ------------------------------------------------------------------ */

        html = html.replace(

            /```([a-zA-Z0-9_-]+)?\n?([\s\S]*?)```/g,

            (_, language = "", code) => {

                const lang = language.trim();

                const cls = lang
                    ? ` class="language-${lang}"`
                    : "";

                const token = `@@CODEBLOCK_${codeBlocks.length}@@`;

                codeBlocks.push(
                    `<pre><code${cls}>${code.trim()}</code></pre>`
                );

                return token;

            }

        );


        /* ------------------------------------------------------------------
           Inline Code
        ------------------------------------------------------------------ */
        html = html.replace(

            /`([^`]+)`/g,

            (match, code) => {

                const token = `@@INLINECODE_${inlineCodes.length}@@`;

                inlineCodes.push(
                    `<code>${code}</code>`
                );

                return token;

            }

        );
/* ------------------------------------------------------------------
   Bold
------------------------------------------------------------------ */

        html = html.replace(

            /\*\*([^\n*]+?)\*\*/g,

            "<strong>$1</strong>"

        );

/* ------------------------------------------------------------------
           Italic

------------------------------------------------------------------ */

        html = html.replace(

            /(^|[^\*])\*([^\n*]+?)\*(?!\*)/gm,

            "$1<em>$2</em>"
    
        );


        /* ------------------------------------------------------------------
           Links
        ------------------------------------------------------------------ */

        html = html.replace(

            /\[(.*?)\]\((.*?)\)/g,

            (match,text,url)=>{


                if(
                    !/^https?:\/\//i.test(url)
                ){

                    return text;

                }


                return `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;


            }

        );

        /* ------------------------------------------------------------------
           Headings
        ------------------------------------------------------------------ */

        html = html.replace(/^### (.*)$/gm,"<h3>$1</h3>");
        html = html.replace(/^## (.*)$/gm,"<h2>$1</h2>");
        html = html.replace(/^# (.*)$/gm,"<h1>$1</h1>");

        /* ------------------------------------------------------------------
           Block Quotes
        ------------------------------------------------------------------ */

        html = html.replace(

            /((?:^>.*(?:\r?\n|$))+)/gm,

            (match)=>{

                const text =
                    match
                    .replace(/^>\s?/gm,"")
                    .trim();


                return `<blockquote>${text}</blockquote>`;

            }

        );

        /* ------------------------------------------------------------------
           Horizontal Rule
        ------------------------------------------------------------------ */

        html = html.replace(

            /^---$/gm,

            "<hr>"

        );


        html = html.replace(

            /^={3,}$/gm,

            "<hr>"

        );


        html = html.replace(

            /^[-]{4,}$/gm,

            "<hr>"

        );


        /* ------------------------------------------------------------------
           Numbered Lists
        ------------------------------------------------------------------ */

html = html.replace(

    /((?:^\d+(?:\.|\)|-)\s+.*(?:\r?\n|$))+)/gm,

    (match) => {

        const items = match
            .trim()
            .split(/\r?\n/)
            .map(line => {

                const text =
                    line.replace(
                        /^\d+(?:\.|\)|-)\s+/,
                        ""
                    ).trim();


                return `<li>${text}</li>`;

            })
            .join("");

        return `<ol>${items}</ol>`;

    }

);

/* ------------------------------------------------------------------
   Bullet Lists
------------------------------------------------------------------ */

html = html.replace(

    /((?:^(?:[-*•✓→▪◦➜✔☑◆★])\s+.*(?:\r?\n|$))+)/gm,

    (match) => {


        const items =
            match
                .trim()
                .split(/\r?\n/)
                .map(line=>{


                    const text =
                        line.replace(
                            /^(?:[-*•✓→▪◦➜✔☑◆★])\s+/,
                            ""
                        ).trim();


                    return `<li>${text}</li>`;


                })
                .join("");



        return `<ul>${items}</ul>`;


    }

);

        /* ------------------------------------------------------------------
           Tables
        ------------------------------------------------------------------ */

        if (/^\|.*\|$/m.test(html)) {

            const lines = html.split("\n");

            let output = [];
            let table = [];

            const flush = ()=>{

                if(!table.length) return;

                output.push("<table><thead>");

                table.forEach((row,index)=>{


                    const cols = row
                        .split("|")
                        .filter(Boolean)
                        .map(
                            c=>c.trim()
                        );


                    if(index === 0){

                        output.push("<tr>");


                        cols.forEach(col=>{


                            output.push(

                                `<th>${col}</th>`

                            );


                        });


                        output.push("</tr>");


                    }


                });


                output.push("</thead><tbody>");


                table.slice(1).forEach(row=>{


                    const cols = row
                        .split("|")
                        .filter(Boolean)
                        .map(
                            c=>c.trim()
                        );


                    output.push("<tr>");


                    cols.forEach(col=>{


                        output.push(

                            `<td>${col}</td>`

                        );


                    });


                    output.push("</tr>");


                });


                output.push("</tbody></table>");
                table=[];

            };

            lines.forEach(line=>{

                if (/^\|.*\|$/.test(line.trim())) {

                    if (!/^\|?[\s:-]+\|/.test(line.trim())) {

                        table.push(line);

                    }

                }else{

                    flush();

                    output.push(line);

                }

            });

            flush();

            html = output.join("\n");

        }

        /* ------------------------------------------------------------------
           Paragraphs
        ------------------------------------------------------------------ */

        html = html.replace(

            /([^\n])\n((?:[-*•✓→▪◦➜✔☑◆★])\s+)/g,

            "$1\n\n$2"

        );


        html = html.replace(

            /\n{3,}/g,

            "\n\n"

        );


        const blocks = html
            .split(/\n\s*\n/)
            .map(x=>x.trim())
            .filter(Boolean);

        html = blocks.map(block=>{

            if (

                /^<(h\d|ul|ol|pre|table|blockquote|hr|img|figure|p)/i.test(block)

            ) {

                return block;

            }


            return `<p>${
                block
                    .trim()
            }</p>`;

        }).join("\n");

        html = html.replace(/\n{3,}/g, "\n\n");

        codeBlocks.forEach((block, index) => {

            html = html.replace(

                `@@CODEBLOCK_${index}@@`,

                block

            );

        });


        inlineCodes.forEach((block, index) => {

            html = html.replace(

                `@@INLINECODE_${index}@@`,

                block

            );

        });

        html = html.replace(
            /<p>\s*<\/p>/g,
            ""
        );


        return html.trim();

    }

};

export default ContentRenderer;
