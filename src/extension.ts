import * as vscode from 'vscode';
import { ViewColumn } from 'vscode';

const cats = {
  'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
  'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif',
  'Testing Cat': 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif',
};

function getWebViewContent(catName: keyof typeof cats) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Cat Coding</title>
      </head>
      <body>
          <img src="${cats[catName]}" width="300" />
      </body>
    </html>`;
}

function updateWebViewforCat(
  panel: vscode.WebviewPanel,
  catName: keyof typeof cats
) {
  panel.title = catName;
  panel.webview.html = getWebViewContent(catName);
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

      panel.webview.html = getWebViewContent('Coding Cat');

      panel.onDidChangeViewState(
        (e) => {
          const panel = e.webviewPanel;
          switch (panel.viewColumn) {
            case vscode.ViewColumn.One:
              updateWebViewforCat(panel, 'Coding Cat');
              return;
            case vscode.ViewColumn.Two:
              updateWebViewforCat(panel, 'Compiling Cat');
              return;
            case vscode.ViewColumn.Three:
              updateWebViewforCat(panel, 'Testing Cat');
              return;
          }
        },
        null,
        context.subscriptions
      );
    })
  );
}

export function deactivate() {}
