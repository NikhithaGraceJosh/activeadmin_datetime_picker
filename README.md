# ActiveAdminDatetimePicker
A datetimepicker, compatible with ActiveAdmin.

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'active_admin_datetime_picker'
```

And then execute:

    $ bundle install

Or install it yourself as:

    $ gem install active_admin_datetime_picker

## Usage

Code Sample

```ruby
f.input :column_name, as: :datetimepicker
```

CSS
In active_admin.scss, add the line,

```css
@import active_admin_datetime_picker
```
JS
In active_admin.js, add the line,

```js
//= require active_admin_datetime_picker
```

## Customisations

##### Add a Minimum Date
Disables all dates before the specified minimum date.
```ruby
f.input :column_name, as: :datetimepicker, datetimepicker_options: { min_date: Date.today }
```
##### Add a Maximum Date
Disables all dates after the specified minimum date.
```ruby
f.input :column_name, as: :datetimepicker, datetimepicker_options: { max_date: Date.today }
```
##### Specify a date format
Disables all dates after the specified minimum date.
```ruby
f.input :column_name, as: :datetimepicker, datetimepicker_options: { format: "%mm-%dd-%yyyy %HH:%MM:%SS %P"}
```
###### Example
<sub>Consider selected date is 09 August 2021, 05:07:08 pm</sub>

| <sub> Format Options </sub> | <sub> Meaning  </sub>                            | <sub> Example </sub>  |
| ---------------------------:|:------------------------------------------------:|:---------------------:|
| <sub> '%d' </sub>           | <sub> day (single digit) </sub>                  | <sub> 9 </sub>        |
| <sub> '%dd' </sub>          | <sub> day (2 digits) </sub>                      | <sub> 09 </sub>       |
| <sub> '%m' </sub>           | <sub> month (single digit) </sub>                | <sub> 8 </sub>        |
| <sub> '%mm' </sub>          | <sub> month (2 digits) </sub>                    | <sub> 08 </sub>       |
| <sub> '%yy' </sub>          | <sub> year (2 digits)  </sub>                    | <sub> 21 </sub>       |
| <sub> '%yyyy' </sub>        | <sub> year (4 digits)  </sub>                    | <sub> 2021 </sub>     |
| <sub> '%h' </sub>           | <sub> hour (12hr format, single digit) </sub>    | <sub> 5 </sub>        |
| <sub> '%hh' </sub>          | <sub> hour (12hr format, 2 digits) </sub>        | <sub> 05 </sub>       |
| <sub> '%H' </sub>           | <sub> hour (24hr format, single digit) </sub>    | <sub> 13 </sub>       |
| <sub> '%HH' </sub>          | <sub> hour (24hr format, 2 digits) </sub>        | <sub> 13 </sub>       |
| <sub> '%M' </sub>           | <sub> minutes (single digit) </sub>              | <sub> 7 </sub>        |
| <sub> '%MM' </sub>          | <sub> minutes (2 digits) </sub>                  | <sub> 07 </sub>       |
| <sub> '%S'  </sub>          | <sub> seconds (single digit) </sub>              | <sub> 8 </sub>        |
| <sub> '%SS' </sub>          | <sub> seconds (2 digits) </sub>                  | <sub> 08 </sub>       |
| <sub> '%P' </sub>           | <sub> time period in lower case </sub>           | <sub> AM/PM </sub>    |
| <sub> '%p' </sub>           | <sub> time period in lower case </sub>           | <sub> am/pm </sub>    |
| <sub> '%a' </sub>           | <sub> Day in words (short) </sub>                | <sub> Thu </sub>      |
| <sub> '%A' </sub>           | <sub> Day in words </sub>                        | <sub> Thursday </sub> |
| <sub> '%b' </sub>           | <sub> Month in words (short) </sub>              | <sub> Aug </sub>      |
| <sub> '%B' </sub>           | <sub> Month in words </sub>                      | <sub> August </sub>   |

##### Exclude Timepicker
Hides the timepicker.
```ruby
f.input :column_name, as: :datetimepicker, datetimepicker_options: { only_datepicker: true }
```

## Development

<!-- After checking out the repo, run `bin/setup` to install dependencies. Then, run `rake spec` to run the tests. You can also run `bin/console` for an interactive prompt that will allow you to experiment.
To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org). -->

## Contributing

<!-- Bug reports and pull requests are welcome on GitHub at https://github.com/[USERNAME]/active_admin_datetime_picker. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/[USERNAME]/active_admin_datetime_picker/blob/master/CODE_OF_CONDUCT.md). -->


## Code of Conduct

<!-- Everyone interacting in the ActiveAdminDatetimePicker project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/[USERNAME]/active_admin_datetime_picker/blob/master/CODE_OF_CONDUCT.md). -->
