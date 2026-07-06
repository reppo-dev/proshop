import CheckoutSteps from "@/components/CheckoutSteps";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { saveShipipingAddress } from "@/redux/slices/cartSlice";
import type { RootState } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import z from "zod";

const addressSchema = z.object({
  user_address: z.string().min(1, "Please type your address"),
  city: z.string().min(1, "City must be 1 charakter"),
  postal_code: z.string().min(1, ""),
  country: z.string(),
});

type FormAddressSchema = z.infer<typeof addressSchema>;

const ShippingScreen = () => {
  const form = useForm<FormAddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      user_address: "",
      city: "",
      postal_code: "",
      country: "",
    },
  });
  const cart = useSelector((state: RootState) => state.cart);
  const [loading, setLoading] = useState(false);

  const { shippingAddress } = cart;

  useEffect(() => {
    form.reset({
      user_address: shippingAddress.user_address || "",
      city: shippingAddress.city || "",
      postal_code: shippingAddress.postal_code || "",
      country: shippingAddress.country || "",
    });
  }, [shippingAddress, form]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = async (data: FormAddressSchema) => {
    setLoading(true);
    dispatch(saveShipipingAddress(data));
    navigate("/payment");
    setLoading(false);
  };

  return (
    <div className="flex flex-col w-full items-center justify-center my-4">
      <CheckoutSteps step1 step2 />
      <Card className="max-w-xl w-full">
        <CardHeader>
          <h1 className="font-bold text-2xl">Shipping</h1>
        </CardHeader>
        <CardContent>
          <form className="px-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="user_address"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Address</FieldLabel>
                    <Input
                      {...field}
                      id="user_address"
                      placeholder="20 Main st"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="city"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="city">City</FieldLabel>
                    <Input
                      {...field}
                      id="city"
                      placeholder="Boston"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="postal_code"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="postal_code">Postal Code</FieldLabel>
                    <Input
                      {...field}
                      id="postal_code"
                      placeholder="01012"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="country"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="country">Country</FieldLabel>
                    <Input
                      {...field}
                      id="country"
                      placeholder="USA"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? <Loading /> : "Save Address"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShippingScreen;
