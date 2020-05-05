$(function () {
    $(document).on('focus', '.ui-datetime-picker-wrapper > .ui-datetime-picker-input', function (e) {
        if ($(e.target).siblings('div.datepicker-container').length == 0) {
            console.log("initialize datepicker")
            html = `<div class="datepicker-container">
                <div class="header">
                    <span>
                        <i class="fas fa-chevron-left"></i>
                    </span>
                    <span>July</span>
                    <span>2019</span>
                </div>
                <div class="body">
                <table>
                <thead>
                <tr>
                <th> Mon </th>
                <th> Tue </th>
                <th> Wed </th>
                <th> Thurs </th>
                <th> Fri </th>
                <th> Sat </th>
                <th> Sun </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                </tr>
                <tr>
                <td>8</td>
                <td>9</td>
                <td>10</td>
                <td>11</td>
                <td>12</td>
                <td>13</td>
                <td>14</td>
                </tr>
                <tr>
                <td>15</td>
                <td>16</td>
                <td>17</td>
                <td>18</td>
                <td>19</td>
                <td>20</td>
                <td>21</td>
                </tr>
                <tr>
                <td>22</td>
                <td>23</td>
                <td>24</td>
                <td>25</td>
                <td>26</td>
                <td>27</td>
                <td>28</td>
                </tr>
                <tr>
                <td>29</td>
                <td>30</td>
                </tr>
                </tbody>
                </table>
                </div>
                </div>`
            $(e.target).after(html)
        }
    })
    $(document).on('focusout', '.ui-datetime-picker-wrapper > .ui-datetime-picker-input', function (e) {
        $(e.target).siblings('div.datepicker-container').remove()
    })

})