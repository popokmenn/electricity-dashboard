import { useEffect, useState } from "react";
import { Classify, Customer } from "./types";
import { supabase } from "src/util/supabase-client";

const initialdataForm: Customer = {
    id: null,
    name: '',
    tariff: 0,
    wattage: 0,
    address: '',
    power_line: '',
    id_classify: 0,
    serial_number: '',
    classify: null,
}
const useUnitData = () => {
    const [isError, setIsError] = useState({isError: false, message: ''});
    const [isSuccess, setIsSuccess] = useState({isSuccess: false, message: ''});
    const [isLoading, setIsLoading] = useState(false);

    const [classifyData, setClassifyData] = useState<Classify[]>([]);
    const [customerData, setCustomerData] = useState<Customer[]>([]);
    const [dataForm, setDataForm] = useState<Customer>(initialdataForm);

    const fetchClassifyData = async () => {
        try {
            let { data: classifydata, error } = await supabase
                .from('classify')
                .select('*')
                .limit(100);

            if (error) {
                console.error('Error fetching classify data:', error.message);
                setIsError({isError: true, message: 'Error fetching classify data'});
                return;
            }

            if (classifydata) {
                setClassifyData(classifydata);
            }
        } catch (error) {
            console.error('Unexpected error fetching classify data:', error);
            setIsError({isError: true, message: 'Unexpected error fetching classify data'});
        }
    };

    const fetchCustomerData = async () => {
        try {
            let { data: customerdata, error } = await supabase
                .from('customer')
                .select('*, classify(*)')
                .limit(100);

            if (error) {
                console.error('Error fetching customer data:', error.message);
                setIsError({isError: true, message: 'Error fetching customer data'});
                return;
            }

            if (customerdata) {
                setCustomerData(customerdata);
            }
        } catch (error) {
            console.error('Unexpected error fetching customer data:', error);
            setIsError({isError: true, message: 'Unexpected error fetching customer data'});
        }
    };

    const saveCustomerData = async () => {
        setIsLoading(true);
        try {
            let response;
            if (dataForm.id) {
                // Update existing customer
                response = await supabase
                    .from('customer')
                    .update({
                        serial_number: dataForm.serial_number, 
                        name: dataForm.name, 
                        address: dataForm.address, 
                        id_classify: dataForm.id_classify, 
                        wattage: dataForm.wattage, 
                        power_line: dataForm.power_line, 
                        tariff: dataForm.tariff 
                    })
                    .eq('id', dataForm.id)
                    .select();
            } else {
                // Insert new customer
                response = await supabase
                    .from('customer')
                    .insert([
                        { 
                            serial_number: dataForm.serial_number, 
                            name: dataForm.name, 
                            address: dataForm.address, 
                            id_classify: dataForm.id_classify, 
                            wattage: dataForm.wattage, 
                            power_line: dataForm.power_line, 
                            tariff: dataForm.tariff 
                        },
                    ])
                    .select();
            }

            const { data, error } = response;

            if (error) {
                console.error('Error saving customer data:', error.message);
                setIsError({isError: true, message: 'Error saving customer data'});
                setIsLoading(false);
                return;
            }

            if (data) {
                console.log('Customer data saved successfully:', data);
                setIsSuccess({isSuccess: true, message: 'Customer data saved successfully'});
                setIsLoading(false);
            }

            fetchCustomerData();
        } catch (error) {
            console.error('Unexpected error saving customer data:', error);
            setIsError({isError: true, message: 'Unexpected error saving customer data'});
            setIsLoading(false);
        }
    };

    const resetDataForm = () => {
        setDataForm(initialdataForm);
    }

    useEffect(() => {
        if (isError.isError) {
            const timer = setTimeout(() => {
                setIsError({ isError: false, message: '' });
            }, 5000); // Clear error after 5 seconds

            return () => clearTimeout(timer); // Cleanup on unmount or if isError changes
        }
    }, [isError]);

    useEffect(() => {
        if (isSuccess.isSuccess) {
            const timer = setTimeout(() => {
                setIsSuccess({ isSuccess: false, message: '' });
            }, 5000); // Clear success after 5 seconds

            return () => clearTimeout(timer); // Cleanup on unmount or if isSuccess changes
        }
    }, [isSuccess]);

   
    return {
        data: { 
            isError,
            dataForm, 
            isSuccess,
            isLoading, 
            classifyData, 
            customerData,
        },
        method: { 
            setIsError,
            setDataForm, 
            setIsSuccess,
            resetDataForm,
            fetchClassifyData, 
            fetchCustomerData,
            saveCustomerData,
        }
    };
}

export { useUnitData };
