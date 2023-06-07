import React, { useEffect, useState, useCallback } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { useFormContext, Controller } from 'react-hook-form';
import { FiAlertCircle, FiCalendar } from 'react-icons/fi';
import { getYear, getMonth } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import range from 'lodash/range';

import { Container, Error, ContainerData, CalendarHeader, CalendarButton } from './styles';
import 'react-datepicker/dist/react-datepicker.css';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

interface Props extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string;
  containerStyle?: React.CSSProperties;
}

const Datepicker = ({ name, containerStyle={}, ...rest }: Props) => {
    const { control, formState: { errors }, setValue } = useFormContext();

    const years = range(1900, getYear(new Date()) + 2, 1);
    const months = [ 
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ];
    
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    
    const handleInputFocus = useCallback(() => {
        setIsFocused(true)
    }, []);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);

        setIsFilled(false);
    }, []);

    return (
        <Controller
            control={control}
            name={name}
            render={(props) => (
                <Container style={containerStyle} isErrored={!!errors[name]} isFilled={isFilled} isFocused={isFocused} >
                    <FiCalendar size={20} />
                    <ReactDatePicker
                        renderCustomHeader={({
                            date,
                            changeYear,
                            changeMonth,
                            decreaseMonth,
                            increaseMonth,
                            prevMonthButtonDisabled,
                            nextMonthButtonDisabled,
                        }) => (
                            <CalendarHeader>
                                <CalendarButton type="button" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                    <RiArrowLeftSLine size={40}/>
                                </CalendarButton>
                                <select
                                    value={getYear(date)}
                                    onChange={({ target: { value } }) => changeYear(Number(value))}
                                >
                                    {years.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={months[getMonth(date)]}
                                    onChange={({ target: { value } }) =>
                                    changeMonth(months.indexOf(value))
                                    }
                                >
                                    {months.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>

                                <CalendarButton type="button" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                    <RiArrowRightSLine size={40}/>
                                </CalendarButton>
                            </CalendarHeader>
                        )}
                        name={name}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur} 
                        selected={props.field.value}
                        onChange={(e) => (setValue(name, e))}
                        dateFormat="dd/MM/yyyy"
                        withPortal
                        locale={ptBR}
                        calendarContainer={ContainerData}
                        {...rest}
                    />

                    {errors[name] && 
                        <Error title={errors[name]?.message}>
                            <FiAlertCircle color="#c53030" size={20} />
                        </Error>
                    }
                </Container>
            )}
        />
    );
};

export default Datepicker;