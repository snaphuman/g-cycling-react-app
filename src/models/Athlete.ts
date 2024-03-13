export default class Athlete {
    constructor (
        public id?: string,
        public username?: string,
        public resource_state?: string,
        public firstname?: string,
        public lastname?: string,
        public bio?: string,
        public city?: string,
        public state?: string,
        public country?: string,
        public sex?: string,
        public premium?: string,
        public summit?: string,
        public created_at?: string,
        public updated_at?: string,
        public badge_type_id?: string,
        public weight?: string,
        public profile_medium?: string,
        public profile?: string,
        public friend?: string,
        public follower?: string,
    ) {
    }
}