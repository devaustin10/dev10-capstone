package learn.hiking.domain;

public class Validations {
        public static boolean isNullOrBlank(String value) {
            return value == null || value.isBlank();
        }
}
