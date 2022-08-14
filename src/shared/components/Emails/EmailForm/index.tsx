import React from "react";
import {
  FormContainer,
  TextFieldElement,
  CheckboxElement,
} from "react-hook-form-mui";
import { useParams } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import QuoteService from "../../../../services/quote.service";
import toast from "../../../../utils/toast.util";
import { Email, EmailFormProps } from "../../../models/Email";



const EmailForm = (props: EmailFormProps) => {
  let { id } = useParams();
  const email: Email = props.email || {};
  const formContext = useForm({ defaultValues: email });

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset,
    resetField
  } = formContext;

  const handleClearForm = () => reset();

  const handleSubmitForm = (e) => {
    if (!e.title || !e.message) return;
    const payload = { 
      ...e,
      isCritical: e.isCritical || false,
      quoteId: id,
      id: props.id || 0
    };
    QuoteService.createEmail(payload)
      .then((response) => {
        if (response.status) {
          toast.success(response.message);
          reset({ isCritical: false, title: '', message: '' });
          props.onSuccess(response.result);
        } else {
          toast.error(response.message);
        }
      })
      .catch(({ response }) => {
        toast.error(response.message);
      });
  };

  return (
    <FormContainer formContext={formContext} onSuccess={handleSubmit(handleSubmitForm)}>  
      <h3 style={{ marginLeft: "10px" }}>New Email</h3>   
      <div>        
        <TextFieldElement
          sx={{ m: 1, minWidth: "96%" }}
          required={true}
          name={"title"}
          label="Email Title"
          variant="outlined"
          validation={{ maxLength: 100 }}
        />      
      </div>
      <div>        
        <TextFieldElement
          sx={{ m: 1, minWidth: "96%" }}
          required={true}
          name={"message"}
          label="Email Description"
          variant="outlined"
          validation={{ maxLength: 1000 }}
          multiline={true}
          rows={7}
        />      
      </div>
      <div style={{ marginLeft: "10px" }}>
        <CheckboxElement 
          sx={{ m: 1 }}
          name={"isCritical"} label="Mark Critical"/>
      </div>

      <div style={{ marginLeft: "12px", marginTop: "15px" }}>
        <Stack direction="row" spacing={2}>
          <Button
            type={"submit"}
            size="large"
            variant="contained"
          >
            Save
          </Button>
          <Button
            size="large"
            variant="outlined"
            type="button"
            onClick={handleClearForm}
          >
            Cancel
          </Button>
        </Stack>
      </div>
    </FormContainer>        
  );
};

export default EmailForm;
