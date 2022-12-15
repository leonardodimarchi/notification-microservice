import { Content } from "./content";

describe('Notification - Content', () => {
    it('should be able to create a content', () => {
        const content = new Content('Valid content');

        expect(content).toBeTruthy();
    });

    it('should not be able to create a content with less than 5 characters', () => {
        const createContent = () => new Content('...');

        expect(createContent).toThrow();
    });

    it('should not be able to create a content with more than 5 characters', () => {
        const createContent = () => new Content('.'.repeat(241));

        expect(createContent).toThrow();
    });
});