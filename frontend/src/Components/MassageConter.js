import React from 'react';
import { Table } from 'react-bootstrap';

const MassageConter = ({ usermessages = [] }) => {
    return (
        <div>
            <Table striped bordered>
                <tbody>
                    {usermessages.map((msg, index) => (
                        <tr key={index}>
                            <td>{msg.user} - {msg.message}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            ss
        </div>
    );
}

export default MassageConter;
