import {describe, expect, test} from 'vitest';
import {TaskIdParser} from '../TaskIdParser';

describe('Parse task ids', () => {

    test('Parse letter-digits custom ID', () => {
        const parser = new TaskIdParser();
        const result = parser.getFromUrl('http://clickup.com/task/ABC-123');
        expect(result).toEqual('ABC-123');
    });

    test('Parse letter-digits system ID', () => {
        const parser = new TaskIdParser();
        const result = parser.getFromUrl('http://clickup.com/task/abs4d6r23');
        expect(result).toEqual('abs4d');
    });

});