import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    // "Hello World" command
    let helloCommand = vscode.commands.registerCommand('extension.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from my first extension!');
    });

    // New command to insert a code snippet
    let insertSnippetCommand = vscode.commands.registerCommand('extension.insertSnippet', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const snippet = new vscode.SnippetString('console.log($1);');
            editor.insertSnippet(snippet);
        }
    });

    context.subscriptions.push(helloCommand);
    context.subscriptions.push(insertSnippetCommand);
}

export function deactivate() {}
