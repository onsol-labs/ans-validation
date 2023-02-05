import url from 'url';
import { Domain } from './domain';
import { RestrictionLevel } from './enums';
import { SpoofChecker } from './spoof-checker';

export function validate(input: string): boolean {
    try {
        const domain: Domain = new Domain(input);
        return cleanupANS(domain.labels);
    } catch (e) {
        console.log((e as Error).message);
        return false;
    }
}

function cleanupANS(strings: string[]): boolean {
    const checker: SpoofChecker = new SpoofChecker();
    checker.restrictionLevel = RestrictionLevel.ASCII;
    // checker.restrictionLevel = RestrictionLevel.HIGHLY_RESTRICTIVE;

    const string = strings[0];

    // checks for ['-', '_'] in the beginning and at the end.
    // checks for xn--, since currently we don't allot such values.
    const unicode = url.domainToUnicode(string);
    if (
        string.charAt(0).includes('-') ||
        string.charAt(0).includes('_') ||
        string.charAt(string.length - 1).includes('-') ||
        string.charAt(string.length - 1).includes('_') ||
        string.includes('--') ||
        string === 'None' ||
        string === '' ||
        !string ||
        unicode === '' ||
        !unicode
    ) {
        return false;
    }
    return checker.safeToDisplayAsUnicode(unicode, true);
}
