import * as vscode from 'vscode';
import * as path from 'path';

function getWebViewContent(cat: vscode.Uri) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Cat Coding</title>
      </head>
      <body>
          <img src="${cat}" width="300" />
      </body>
    </html>`;
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      const panel = vscode.window.createWebviewPanel(
        'catCoding',
        'Cat Coding',
        vscode.ViewColumn.One,
        {}
      );

      const diskPath = vscode.Uri.file(
        path.join(context.extensionPath, 'src/media', 'cat.gif')
      );

      const catGifSrc = panel.webview.asWebviewUri(diskPath);

      panel.webview.html = getWebViewContent(catGifSrc);
    })
  );
}

export function deactivate() {}
