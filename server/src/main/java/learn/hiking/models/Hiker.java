package learn.hiking.models;

public class Hiker {
        private int hikerId;
        private String firstName;
        private String lastName;
        private int age;
        private String email;
        private int trailId;

        public Hiker() {
        }

        public int getHikerId() {
            return hikerId;
        }

        public void setHikerId(int hikerId) {
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

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public int getTrailId() {
        return trailId;
    }
        public void setTrailId(int trailId) {
        this.trailId = trailId;
    }
}