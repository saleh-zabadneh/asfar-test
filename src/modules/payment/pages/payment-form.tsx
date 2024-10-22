import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  category: z.string().min(1, { message: 'Please select a category.' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' }),
  terms: z.boolean().refine((value) => value === true, {
    message: 'You must accept the terms and conditions.',
  }),
  notifications: z.boolean(),
  plan: z.enum(['free', 'pro', 'enterprise'], {
    required_error: 'Please select a plan.',
  }),
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, { message: 'Please upload a file.' }),
});

type FormData = z.infer<typeof formSchema>;

export default function ModernForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-4xl shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Submit Your Application
          </CardTitle>
          <CardDescription>
            Fill out the form below to apply. All fields are required unless
            otherwise stated.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" {...register('name')} />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" {...register('message')} />
              {errors.message && (
                <p className="text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" {...register('terms')} />
              <Label htmlFor="terms">I agree to the terms and conditions</Label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-500">{errors.terms.message}</p>
            )}
            <div className="flex items-center space-x-2">
              <Checkbox id="notifications" {...register('notifications')} />
              <Label htmlFor="notifications">Receive notifications</Label>
            </div>
            <div className="grid gap-2">
              <Label>Select a Plan</Label>
              <Controller
                name="plan"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-3 gap-4"
                  >
                    {['free', 'pro', 'enterprise'].map((plan) => (
                      <Label
                        key={plan}
                        htmlFor={plan}
                        className={cn(
                          'flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary',
                          field.value === plan && 'border-primary'
                        )}
                      >
                        <RadioGroupItem
                          value={plan}
                          id={plan}
                          className="sr-only"
                        />
                        <span className="text-lg font-semibold capitalize">
                          {plan}
                        </span>
                      </Label>
                    ))}
                  </RadioGroup>
                )}
              />
              {errors.plan && (
                <p className="text-sm text-red-500">{errors.plan.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="file">Upload File</Label>
              <Input id="file" type="file" {...register('file')} />
              {errors.file && (
                <p className="text-sm text-red-500">{errors.file.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Submit Application
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
