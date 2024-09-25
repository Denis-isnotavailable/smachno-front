import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Text, TextAlign } from '@/components/Text/Text';

describe('Text Component', () => {
    it('renders with default props', () => {
        render(<Text />);
        expect(screen.getByTestId('text-component')).toBeInTheDocument();
    });

    it('renders with provided props', () => {
        const title = 'Test Title';
        const text = 'Test Text';
        const btnText = 'Test btnText';

        render(
            <Text
                title={title}
                text={text}
                btnText={btnText}
                align={TextAlign.LEFT}
            />
        );

        expect(screen.getByTestId('text-component')).toBeInTheDocument();
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(text)).toBeInTheDocument();
        expect(screen.getByText(btnText)).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const customClassName = 'custom-class';

        render(<Text className={customClassName} />);

        expect(screen.getByTestId('text-component')).toHaveClass(
            customClassName
        );
    });

    it('applies text alignment class', () => {
        render(<Text align={TextAlign.RIGHT} />);

        expect(screen.getByTestId('text-component')).toHaveClass('right');
    });
});
