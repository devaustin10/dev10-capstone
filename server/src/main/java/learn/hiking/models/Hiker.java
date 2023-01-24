package learn.hiking.models;

public class Hiker {
        private String hikerId;
        private String firstName;
        private String lastName;
        private int age;

        public Hiker() {
        }

    public Hiker(String hikerId, String firstName, String lastName, int age) {
        this.hikerId = hikerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    public String getHikerId() {
            return hikerId;
        }

        public void setHikerId(String hikerId) {
            this.hikerId = hikerId;
        }

        public String getFirstName() {
            return firstName;
        }

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        public String getLastName() {
            return lastName;
        }

        public void setLastName(String lastName) {
            this.lastName = lastName;
        }

        public int getAge() {
            return age;
        }

        public void setAge(int age) {
            this.age = age;
        }

}