import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import * as sinon from 'sinon';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Print File Info Command', async () => {
		// Create a test file
		const testFilePath = path.join(__dirname, 'test.txt');
		const testFileUri = vscode.Uri.file(testFilePath);
		await vscode.workspace.fs.writeFile(testFileUri, Buffer.from('Test content'));

		// Open the test file
		const document = await vscode.workspace.openTextDocument(testFileUri);
		await vscode.window.showTextDocument(document);

		// Spy on console.log
		const consoleLogSpy = sinon.spy(console, 'log');

		// Execute the command
		await vscode.commands.executeCommand('sf-metadata-helper.printFileInfo');

		// Assert that console.log was called with the correct information
		assert.strictEqual(consoleLogSpy.calledWith(`File Name: ${testFilePath}`), true);
		assert.strictEqual(consoleLogSpy.calledWith(sinon.match(/File Content:\nTest content/)), true);

		// Clean up
		consoleLogSpy.restore();
		await vscode.workspace.fs.delete(testFileUri);
	});
});
