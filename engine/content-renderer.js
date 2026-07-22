"use strict";

/* ==========================================================================
   VIDHWAAN AI Writer

   Content Renderer
   Production Lightweight Version

   Markdown → Clean HTML

   ========================================================================== */


const ContentRenderer = {


    codeBlocks: [],

    inlineCodes: [],



    /* ==========================================================
       MAIN RENDER
       ========================================================== */


    render(text = "") {


        if (

            typeof text !== "string"

        ) {

            text = String(text ?? "");

        }



        text = this.normalize(text);



        if(!text){

            return "";

        }



        this.codeBlocks = [];

        this.inlineCodes = [];



        let html = text;



        html = this.escapeHTML(html);



        html = this.extractCodeBlocks(html);



        html = this.extractInlineCodes(html);



        html = this.renderBlocks(html);



        html = this.renderInline(html);



        html = this.restoreCodes(html);



        html = this.cleanup(html);



        return html;


    },



    /* ==========================================================
       NORMALIZE
       ========================================================== */


    normalize(text){


        return text

            .replace(/\r\n/g,"\n")

            .replace(/\r/g,"\n")

            .replace(/\t/g,"    ")

            .replace(/\u00A0/g," ")

            .replace(/\n{3,}/g,"\n\n")

            .trim();


    },



    /* ==========================================================
       SAFE HTML
       ========================================================== */


    escapeHTML(text){


        return text

            .replace(/&/g,"&amp;")

            .replace(/</g,"&lt;")

            .replace(/>/g,"&gt;");


    },



    /* ==========================================================
       CODE BLOCK PROTECTION
       ========================================================== */


    extractCodeBlocks(text){


        return text.replace(

            /```([a-zA-Z0-9_-]*)\n?([\s\S]*?)```/g,


            (_,language="",code)=>{


                const token =

                    `%%CODE_${this.codeBlocks.length}%%`;



                this.codeBlocks.push({

                    language:language.trim(),

                    code:code.trim()

                });



                return token;


            }


        );


    },



    /* ==========================================================
       INLINE CODE PROTECTION
       ========================================================== */


    extractInlineCodes(text){


        return text.replace(

            /`([^`\n]+)`/g,


            (_,code)=>{


                const token =

                    `%%INLINE_${this.inlineCodes.length}%%`;



                this.inlineCodes.push(code);



                return token;


            }


        );


    },

    /* ==========================================================
       BLOCK RENDERER
       ========================================================== */


    renderBlocks(text){


        text = this.renderHeadings(text);


        text = this.renderHorizontalRules(text);


        text = this.renderBlockquotes(text);


        text = this.renderTables(text);


        text = this.renderLists(text);


        text = this.renderParagraphs(text);


        return text;


    },



    /* ==========================================================
       HEADINGS
       ========================================================== */


    renderHeadings(text){


        return text.replace(

            /^(#{1,6})\s+(.+)$/gm,


            (_,marks,content)=>{


                const level = marks.length;


                return (

                    `<h${level}>${content.trim()}</h${level}>`

                );


            }

        );


    },



    /* ==========================================================
       HORIZONTAL RULE
       ========================================================== */


    renderHorizontalRules(text){


        return text.replace(

            /^(\*{3,}|-{3,}|_{3,})$/gm,


            "<hr>"


        );


    },



    /* ==========================================================
       BLOCKQUOTE
       ========================================================== */


    renderBlockquotes(text){


        return text.replace(

            /(^>\s?.+(?:\n|$))+/gm,


            block=>{


                const content = block

                    .trim()

                    .split("\n")

                    .map(line=>

                        line.replace(/^>\s?/,"")

                    )

                    .join("<br>");



                return (

                    `<blockquote>${content}</blockquote>`

                );


            }


        );


    },



    /* ==========================================================
       LISTS
       ========================================================== */


    renderLists(text){


        text = text.replace(

            /((?:^\d+\.\s+.+(?:\n|$))+)/gm,


            block=>{


                const items = block

                    .trim()

                    .split("\n")

                    .map(line=>{


                        const item = line.replace(

                            /^\d+\.\s+/,

                            ""

                        ).trim();



                        return `<li>${item}</li>`;


                    })

                    .join("");



                return `<ol>${items}</ol>`;


            }


        );



        text = text.replace(

            /((?:^[-*+]\s+.+(?:\n|$))+)/gm,


            block=>{


                const items = block

                    .trim()

                    .split("\n")

                    .map(line=>{


                        const item = line.replace(

                            /^[-*+]\s+/,

                            ""

                        ).trim();



                        return `<li>${item}</li>`;


                    })

                    .join("");



                return `<ul>${items}</ul>`;


            }


        );



        return text;


    },



    /* ==========================================================
       PARAGRAPHS
       ========================================================== */


    renderParagraphs(text){


        const blocks = text

            .split(/\n\s*\n/)

            .map(item=>item.trim())

            .filter(Boolean);



        return blocks.map(block=>{


            if(

                /^<(h[1-6]|ul|ol|blockquote|table|pre|hr)/i

                .test(block)

            ){

                return block;

            }



            return `<p>${block.replace(/\n/g,"<br>")}</p>`;


        })

        .join("\n\n");


    },


    /* ==========================================================
       TABLES
       ========================================================== */


    renderTables(text){


        const lines = text.split("\n");

        const result = [];

        let i = 0;



        while(i < lines.length){


            if(

                this.isTableStart(

                    lines,

                    i

                )

            ){


                const table =

                    this.buildTable(

                        lines,

                        i

                    );



                result.push(

                    table.html

                );



                i = table.next;


                continue;


            }



            result.push(

                lines[i]

            );


            i++;


        }



        return result.join("\n");


    },



    isTableStart(lines,index){


        if(index + 1 >= lines.length){

            return false;

        }



        return (

            /^\|.*\|$/.test(

                lines[index].trim()

            )

            &&

            /^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?$/

            .test(

                lines[index+1].trim()

            )

        );


    },



    buildTable(lines,start){


        const header =

            this.parseTableRow(

                lines[start]

            );



        const rows = [];

        let index = start + 2;



        while(

            index < lines.length

            &&

            /^\|.*\|$/.test(

                lines[index].trim()

            )

        ){

            rows.push(

                this.parseTableRow(

                    lines[index]

                )

            );


            index++;

        }



        let html =

            "<table><thead><tr>";



        header.forEach(cell=>{


            html +=

                `<th>${cell}</th>`;


        });



        html +=

            "</tr></thead><tbody>";



        rows.forEach(row=>{


            html += "<tr>";



            row.forEach(cell=>{


                html +=

                    `<td>${cell}</td>`;


            });



            html += "</tr>";


        });



        html +=

            "</tbody></table>";



        return {

            html,

            next:index

        };


    },



    parseTableRow(line){


        return line

            .trim()

            .replace(/^\|/,"")

            .replace(/\|$/,"")

            .split("|")

            .map(

                cell=>cell.trim()

            );

    },



    /* ==========================================================
       INLINE RENDERER
       ========================================================== */


    renderInline(text){


        text = this.renderImages(text);


        text = this.renderLinks(text);


        text = this.renderBoldItalic(text);


        text = this.renderBold(text);


        text = this.renderItalic(text);


        text = this.renderStrike(text);


        text = this.renderAutoLinks(text);


        return text;


    },



    renderImages(text){


        return text.replace(

            /!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/g,


            (_,alt,url)=>{


                return `

<figure class="vw-image">

<img src="${url}" alt="${alt}" loading="lazy">

</figure>

`.trim();


            }


        );


    },


    renderLinks(text){


        return text.replace(

            /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,


            (_,label,url)=>{


                return (

                    `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`

                );


            }


        );


    },


    /* ==========================================================
       BOLD + ITALIC
       ========================================================== */


    renderBoldItalic(text){


        return text.replace(

            /\*\*\*(.+?)\*\*\*/g,

            "<strong><em>$1</em></strong>"

        );


    },



    /* ==========================================================
       BOLD
       ========================================================== */


    renderBold(text){


        return text.replace(

            /\*\*([^\n*]+?)\*\*/g,

            "<strong>$1</strong>"

        );


    },



    /* ==========================================================
       ITALIC
       ========================================================== */


    renderItalic(text){


        return text.replace(

            /(^|[^*])\*([^*\n]+?)\*(?!\*)/gm,

            "$1<em>$2</em>"

        );


    },



    /* ==========================================================
       STRIKETHROUGH
       ========================================================== */


    renderStrike(text){


        return text.replace(

            /~~(.+?)~~/g,

            "<del>$1</del>"

        );


    },



    /* ==========================================================
       AUTO URL
       ========================================================== */


    renderAutoLinks(text){


        return text.replace(

            /(^|[\s>])(https?:\/\/[^\s<]+)/g,


            (_,prefix,url)=>{


                if(

                    url.includes('href=')

                ){

                    return _;

                }



                return (

                    `${prefix}<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`

                );


            }

        );


    },



    /* ==========================================================
       RESTORE CODE
       ========================================================== */


    restoreCodes(html){


        this.codeBlocks.forEach(

            (item,index)=>{


                const token =

                    `%%CODE_${index}%%`;



                const language =

                    item.language

                        ? ` class="language-${item.language}"`

                        : "";



                html = html.replace(

                    token,

                    `<pre><code${language}>${this.escapeHTML(item.code)}</code></pre>`

                );


            }

        );



        this.inlineCodes.forEach(

            (code,index)=>{


                const token =

                    `%%INLINE_${index}%%`;



                html = html.replace(

                    token,

                    `<code>${this.escapeHTML(code)}</code>`

                );


            }

        );


        return html;


    },



    /* ==========================================================
       CLEANUP
       ========================================================== */


    cleanup(html){


        return html

            .replace(

                /<p>\s*<\/p>/g,

                ""

            )

            .replace(

                /\n{3,}/g,

                "\n\n"

            )

            .trim();


    }


};



export default ContentRenderer;
