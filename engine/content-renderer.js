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

            /```([\s\S]*?)```/g,

            (_,code)=>`<pre><code>${code.trim()}</code></pre>`

        );

        /* ------------------------------------------------------------------
           Inline Code
        ------------------------------------------------------------------ */

        html = html.replace(

            /`([^`]+)`/g,

            "<code>$1</code>"

        );

        /* ------------------------------------------------------------------
           Bold
        ------------------------------------------------------------------ */

        html = html.replace(

            /\*\*(.*?)\*\*/g,

            "<strong>$1</strong>"

        );

        /* ------------------------------------------------------------------
           Italic
        ------------------------------------------------------------------ */

        html = html.replace(

            /\*(.*?)\*/g,

            "<em>$1</em>"

        );

        /* ------------------------------------------------------------------
           Links
        ------------------------------------------------------------------ */

        html = html.replace(

            /\[(.*?)\]\((.*?)\)/g,

            '<a href="$2" target="_blank" rel="noopener">$1</a>'

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

            /^> (.*)$/gm,

            "<blockquote>$1</blockquote>"

        );

        /* ------------------------------------------------------------------
           Horizontal Rule
        ------------------------------------------------------------------ */

        html = html.replace(

            /^---$/gm,

            "<hr>"

        );

        /* ------------------------------------------------------------------
           Numbered Lists
        ------------------------------------------------------------------ */

        html = html.replace(

            /^\d+\.\s(.*)$/gm,

            "<li>$1</li>"

        );

        html = html.replace(

            /(<li>.*?<\/li>)/gs,

            "<ol>$1</ol>"

        );

        /* ------------------------------------------------------------------
           Bullet Lists
        ------------------------------------------------------------------ */

        html = html.replace(

            /^[-*]\s(.*)$/gm,

            "<li>$1</li>"

        );

        html = html.replace(

            /<ol>([\s\S]*?)<\/ol>\s*<ol>/g,

            "<ol>$1"

        );

        html = html.replace(

            /(<li>.*?<\/li>)/gs,

            "<ul>$1</ul>"

        );

        html = html.replace(

            /<\/ul>\s*<ul>/g,

            ""

        );

        /* ------------------------------------------------------------------
           Tables
        ------------------------------------------------------------------ */

        if(html.includes("|")){

            const lines = html.split("\n");

            let output = [];
            let table = [];

            const flush = ()=>{

                if(!table.length) return;

                output.push("<table>");

                table.forEach((row,index)=>{

                    const cols = row
                        .split("|")
                        .filter(Boolean)
                        .map(c=>c.trim());

                    output.push("<tr>");

                    cols.forEach(col=>{

                        output.push(

                            index===0

                            ? `<th>${col}</th>`

                            : `<td>${col}</td>`

                        );

                    });

                    output.push("</tr>");

                });

                output.push("</table>");

                table=[];

            };

            lines.forEach(line=>{

                if(line.includes("|")){

                    if(!line.match(/^\|\-+/)){

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

        html = html.replace(/\n{3,}/g,"\n\n");


        const blocks = html
            .split(/\n\s*\n/)
            .map(x=>x.trim())
            .filter(Boolean);

        html = blocks.map(block=>{

            if(

                /^<(h\d|ul|ol|pre|table|blockquote|hr)/.test(block)

            ){

                return block;

            }

            return `<p>${block.replace(/\n/g,"<br>")}</p>`;

        }).join("\n");

        html = html.replace(/\n{3,}/g,"\n\n");
        return html;

    }

};

export default ContentRenderer;
