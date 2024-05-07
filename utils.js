function generateHTML(reactMarkup, scriptName, props = {}) {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>E-Commerce</title>
        </head>
        <body>
            <div id="app">${reactMarkup}</div>
            <script defer src="${scriptName}"></script>
            <script>
                window.HYDRATION_PROPS=${JSON.stringify(props)}
            </script>
        </body>
    </html>
    `;
}

module.exports = { generateHTML }