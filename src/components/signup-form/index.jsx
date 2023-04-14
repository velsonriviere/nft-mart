import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "@ui/button";
import ErrorText from "@ui/error-text";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

const SignupForm = ({ className }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const { signup, error, isLoading } = useSignup();

    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        mode: "onChange",
    });
    const onSubmit = async (data, e) => {
        e.preventDefault();
        await signup(email, password, name);
        // eslint-disable-next-line no-console
        console.log(`${email}-${password}-${name}`);
        router.push({
            pathname: "/",
        });
    };

    return (
        <div className={clsx("form-wrapper-one", className)}>
            <h4>Sign Up</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                    <label htmlFor="name" className="form-label">
                        User name
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...register("name", {
                            required: "User name is required",
                        })}
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    {errors.name && (
                        <ErrorText>{errors.name?.message}</ErrorText>
                    )}
                </div>

                <div className="mb-5">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        id="exampleInputEmail1"
                        {...register("exampleInputEmail1", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "invalid email address",
                            },
                        })}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    {errors.exampleInputEmail1 && (
                        <ErrorText>
                            {errors.exampleInputEmail1?.message}
                        </ErrorText>
                    )}
                </div>
                <div className="mb-5">
                    <label htmlFor="newPassword" className="form-label">
                        Create Password
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        {...register("newPassword", {
                            required: "Password is required",
                        })}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    {errors.newPassword && (
                        <ErrorText>{errors.newPassword?.message}</ErrorText>
                    )}
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                    >
                        Re Password
                    </label>
                    <input
                        type="password"
                        id="exampleInputPassword1"
                        {...register("exampleInputPassword1", {
                            required: "Confirm Password is required",
                            validate: (value) =>
                                value === getValues("newPassword") ||
                                "The passwords do not match",
                        })}
                    />
                    {errors.exampleInputPassword1 && (
                        <ErrorText>
                            {errors.exampleInputPassword1?.message}
                        </ErrorText>
                    )}
                </div>
                {error && <div className="error">{error}</div>}
                <div className="mb-5 rn-check-box">
                    <input
                        type="checkbox"
                        className="rn-check-box-input"
                        id="exampleCheck1"
                        {...register("exampleCheck1", {
                            required: "Checkbox is required",
                        })}
                    />
                    <label
                        className="rn-check-box-label"
                        htmlFor="exampleCheck1"
                    >
                        Allow to all terms & Allow to all terms & condition
                    </label>
                    <br />
                    {errors.exampleCheck1 && (
                        <ErrorText>{errors.exampleCheck1?.message}</ErrorText>
                    )}
                </div>
                <Button
                    disabled={isLoading}
                    type="submit"
                    size="medium"
                    className="mr--15"
                >
                    Sign Up
                </Button>
                {/* <Button path="/login" color="primary-alta" size="medium">
                    Log In
                </Button> */}
            </form>
        </div>
    );
};

SignupForm.propTypes = {
    className: PropTypes.string,
};
export default SignupForm;
