var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { saveToStorage, getFromStorage } from '../storage.js';
import { sortAlphabetically } from '../utils.js';
// Add a URL to a category
export function addUrl(urlName, category, url) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield getFromStorage();
        if (!data[category]) {
            data[category] = [];
        }
        data[category].push({ name: urlName, url });
        yield saveToStorage(data); // Ensure we await storage operations
    });
}
// Delete a URL by name in a category
export function deleteUrl(category, urlName) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield getFromStorage();
        data[category] = data[category].filter((urlEntry) => urlEntry.name !== urlName);
        yield saveToStorage(data);
    });
}
// Get all categories sorted alphabetically
export function getSortedCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield getFromStorage();
        const categories = Object.keys(data);
        return sortAlphabetically(categories);
    });
}
// Get all URLs within a category
export function getUrlsInCategory(category) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield getFromStorage();
        return data[category] || [];
    });
}
// Move a URL up in the list
export function moveUrlUp(category, index) {
    return __awaiter(this, void 0, void 0, function* () {
        const urls = yield getUrlsInCategory(category); // Ensure we await the result
        if (index > 0) {
            [urls[index], urls[index - 1]] = [urls[index - 1], urls[index]]; // Swap
            const data = yield getFromStorage();
            data[category] = urls;
            yield saveToStorage(data); // Save the updated array
        }
    });
}
// Move a URL down in the list
export function moveUrlDown(category, index) {
    return __awaiter(this, void 0, void 0, function* () {
        const urls = yield getUrlsInCategory(category); // Ensure we await the result
        if (index < urls.length - 1) {
            [urls[index], urls[index + 1]] = [urls[index + 1], urls[index]]; // Swap
            const data = yield getFromStorage();
            data[category] = urls;
            yield saveToStorage(data); // Save the updated array
        }
    });
}
// Delete a URL by index in a category
export function deleteUrlByIndex(category, index) {
    return __awaiter(this, void 0, void 0, function* () {
        const urls = yield getUrlsInCategory(category); // Ensure we await the result
        urls.splice(index, 1); // Remove the URL from the array
        const data = yield getFromStorage();
        data[category] = urls;
        yield saveToStorage(data);
    });
}
