import PropTypes from "prop-types";
import clsx from "clsx";
import SignupForm from "@components/signup-form";
import SocialAuth from "@components/social-auth";
import Button from "@ui/button";

const SignupArea = ({ className, space }) => (
    <div
        className={clsx(
            "login-area",
            space === 1 && "rn-section-gapTop",
            className
        )}
    >
        <div className="container">
            <div className="row g-5">
                <div className="offset-2 col-lg-4 col-md-6 ml_md--0 ml_sm--0 col-sm-12">
                    <SignupForm />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <h4>Already a Member?</h4>
                    <Button path="/login" color="primary-alta" size="medium">
                        Login Here
                    </Button>
                    {/*<SocialAuth title="Another way to sign up" />*/}
                </div>
            </div>
        </div>
    </div>
);

SignupArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};

SignupArea.defaultProps = {
    space: 1,
};
export default SignupArea;
