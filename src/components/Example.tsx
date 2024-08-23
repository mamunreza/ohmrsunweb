interface ExampleProps {
    name: string;
}

const Example: React.FC<ExampleProps> = ({ name }: ExampleProps) => {

    return (
        <>
            {name}
        </>
    );
};


export default Example;