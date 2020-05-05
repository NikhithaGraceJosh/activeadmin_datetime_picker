class DatetimepickerInput < Formtastic::Inputs::StringInput
    def input_html_options
        super.merge(:class => "ui-datetime-picker-input")
    end
    def wrapper_html_options_raw
        {:class => 'ui-datetime-picker-wrapper'}.merge(options[:wrapper_html] || {}).dup
    end
    def label_html_options
        {
          :for => input_html_options[:id],
          :class => ['label'] << "ui-datetime-picker-label",
        }
      end     
end
