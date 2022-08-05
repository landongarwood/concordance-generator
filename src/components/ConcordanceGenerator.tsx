import { ChangeEvent, FC, useState } from 'react';
import { Button, Col, FloatingLabel, Form, Row, Table } from 'react-bootstrap';
import { generateConcordance, WordOccurrence } from '../utils/generateConcordance';

export const ConcordanceGenerator: FC = () => {
    const [text, setText] = useState<string>('');
    const [wordOccurrences, setWordOccurrences] = useState<WordOccurrence[]>([]);

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    const handleClickGenerate = () => {
        if (text.length === 0) {
            return;
        }

        setWordOccurrences(generateConcordance(text));
    }

    return (
        <>
            <Row>
                <FloatingLabel
                    label="Input text here"
                    className="mb-3"
                >
                    <Form.Control
                        as="textarea"
                        style={{ height: '200px' }}
                        value={text}
                        onChange={handleTextChange}
                    />
                </FloatingLabel>
            </Row>
            <Row>
                <Col className='text-center'>
                    <Button
                        variant="primary"
                        onClick={handleClickGenerate}
                    >
                        Generate
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col className='mt-3'>
                    <Table size="sm" striped bordered hover>
                        <thead>
                            <tr>
                                <th>Word</th>
                                <th>Count</th>
                                <th>Occurrences in sentences</th>
                            </tr>
                        </thead>
                        <tbody>
                            {wordOccurrences.length > 0 && wordOccurrences.map((wordOccurrence, index) => (
                                <tr key={`word-occurrence-row-${index}`}>
                                    <td>
                                        {wordOccurrence.word}
                                    </td>
                                    <td>
                                        {wordOccurrence.count}
                                    </td>
                                    <td>
                                        {wordOccurrence.occurrences.join(', ')}
                                    </td>
                                </tr>
                            ))}

                            {wordOccurrences.length === 0 && (
                                <tr>
                                    <td colSpan={3}>No words found.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </>
    )
}