import './student.css'
export function StudentView () {
    return (
        <div class="container">
            <h1>View Lessons</h1>
            <table class="rwd-table">
                <tbody>
                <tr>
                    <th>Lesson</th>
                    <th>Instructor Name</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Feedback</th>
                    <th>Net Amount</th>
                </tr>
                <tr>
                    <td data-th="Supplier Code">
                    UPS5005
                    </td>
                    <td data-th="Supplier Name">
                    UPS
                    </td>
                    <td data-th="Invoice Number">
                    ASDF19218
                    </td>
                    <td data-th="Invoice Date">
                    06/25/2016
                    </td>
                    <td data-th="Due Date">
                    12/25/2016
                    </td>
                    <td data-th="Net Amount">
                    $8,322.12
                    </td>
                </tr>
                <tr>
                    <td data-th="Supplier Code">
                    UPS3449
                    </td>
                    <td data-th="Supplier Name">
                    UPS South Inc.
                    </td>
                    <td data-th="Invoice Number">
                    ASDF29301
                    </td>
                    <td data-th="Invoice Date">
                    6/24/2016
                    </td>
                    <td data-th="Due Date">
                    12/25/2016
                    </td>
                    <td data-th="Net Amount">
                    $3,255.49
                    </td>
                </tr>
                <tr>
                    <td data-th="Supplier Code">
                    BOX5599
                    </td>
                    <td data-th="Supplier Name">
                    BOX Pro West
                    </td>
                    <td data-th="Invoice Number">
                    ASDF43000
                    </td>
                    <td data-th="Invoice Date">
                    6/27/2016
                    </td>
                    <td data-th="Due Date">
                    12/25/2016
                    </td>
                    <td data-th="Net Amount">
                    $45,255.49
                    </td>
                </tr>
                <tr>
                    <td data-th="Supplier Code">
                    PAN9999
                    </td>
                    <td data-th="Supplier Name">
                    Pan Providers and Co.
                    </td>
                    <td data-th="Invoice Number">
                    ASDF33433
                    </td>
                    <td data-th="Invoice Date">
                    6/29/2016
                    </td>
                    <td data-th="Due Date">
                    12/25/2016
                    </td>
                    <td data-th="Net Amount">
                    $12,335.69
                    </td>
                </tr>
                </tbody>
            </table>
            {/* <h3>Resize Me</h3> */}
        </div>
    )
}

export default StudentView