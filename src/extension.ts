import * as vscode from 'vscode';
import * as path from 'path';

function getWebViewContent() {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Cat Coding</title>
      </head>
      <body>
          <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
          <h1 id="lines-of-code-counter">0</h1>

      <script>
        const vscode = acquireVsCodeApi();

        const counter = document.getElementById('lines-of-code-counter');
        
        // Check if we have an old state to restore from
        const previousState = vscode.getState();
        let count = previousState ? previousState.count : 0;
        counter.textContent = count;
        
        setInterval(() => {
          counter.textContent = count++;
          // Update the saved state
          vscode.setState({ count });
        }, 100);
      </script>
      </body>
    </html>`;
}

export function activate(context: vscode.ExtensionContext) {
  let currentPanel: vscode.WebviewPanel | undefined = undefined;

  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      if (currentPanel) {
        currentPanel.reveal(vscode.ViewColumn.One);
      } else {
        currentPanel = vscode.window.createWebviewPanel(
          'catCoding',
          'Cat Coding',
          vscode.ViewColumn.One,
          {
            enableScripts: true,
          }
        );
      }
      currentPanel.webview.html = getWebViewContent();

      currentPanel.webview.onDidReceiveMessage(
        (message) => {
          switch (message.command) {
            case 'alert':
              vscode.window.showErrorMessage(message.text);
              return;
          }
        },
        undefined,
        context.subscriptions
      );
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.refactor', () => {
      if (!currentPanel) {
        return;
      }
      currentPanel.webview.postMessage({ command: 'refactor' });
    })
  );
}

export function deactivate() {}
