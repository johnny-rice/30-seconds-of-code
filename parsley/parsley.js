/* eslint-disable camelcase */
import { exportLanguageData } from './modelWorkers/language.js';
import { exportSnippetData } from './modelWorkers/snippet.js';
import { exportCollectionData } from './modelWorkers/collection.js';
import { exportCollectionSnippetData } from './modelWorkers/collectionSnippet.js';
import { extractData } from './extractor.js';
import { FileHandler } from './fileHandler.js';
import { AssetHandler } from './assetHandler.js';
import { ContentCreator } from './contentCreator.js';
import { outputPath } from './config.js';

export class Parsley {
  static async prepareContent() {
    const { collections, snippets, languages, collectionSnippets } =
      await extractData();

    const data = {
      collections: exportCollectionData(collections),
      snippets: exportSnippetData(snippets),
      languages: exportLanguageData(languages),
      collectionSnippets: exportCollectionSnippetData(collectionSnippets),
    };

    return FileHandler.write(outputPath, data);
  }

  static async prepareAssets({ force = false } = {}) {
    return await AssetHandler.processAssets({ force });
  }

  static createContent(...args) {
    return ContentCreator.create(...args);
  }
}
