import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button, ButtonTheme } from '@/components/Button/Button';

describe('Button Component', () => {
    it('renders with default props', () => {
        render(
            <Button type='button' theme={ButtonTheme.PRIMARY}>
                Click me
            </Button>
        );

        expect(screen.getByTestId('button-component')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const customClassName = 'custom-class';

        render(
            <Button
                type='button'
                theme={ButtonTheme.PRIMARY}
                className={customClassName}
            >
                Click me
            </Button>
        );

        expect(screen.getByTestId('button-component')).toHaveClass(
            customClassName
        );
    });

    it('calls onClick callback', () => {
        const onClickMock = jest.fn();

        render(
            <Button
                type='button'
                theme={ButtonTheme.PRIMARY}
                onClick={onClickMock}
            >
                Click me
            </Button>
        );

        fireEvent.click(screen.getByTestId('button-component'));

        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    it('applies button theme class', () => {
        render(
            <Button type='button' theme={ButtonTheme.CLEAR}>
                Click me
            </Button>
        );

        expect(screen.getByTestId('button-component')).toHaveClass(
            ButtonTheme.CLEAR
        );
    });
});
