export class RunnerFile {
    public code: string;
    public commit_hash: string;
    public commiter: string;
    public createdAt: string;
    public revision: number;
    public updatedAt: string;

    constructor(
        code: string,
        commit_hash: string,
        commiter: string,
        createdAt: string,
        revision: number,
        updatedAt: string) {
            this.code = code;
            this.commit_hash = commit_hash;
            this.commiter = commiter;
            this.createdAt = createdAt;
            this.revision = revision;
            this.updatedAt = updatedAt;
        }

    public static fromJson(obj) {
        return new RunnerFile(obj.code, obj.commit_hash, obj.commiter, obj.createdAt, obj.revision, obj.updatedAt);
    }

    public static createBlank() {
        return new RunnerFile(
            "import os\nfrom datetime import datetime\n\nfrom werkzeug.utils import secure_filename\n\nfrom src.dao.sql_models import Runner, RunnerFile\nfrom src.repositories.sql_repository import SqlRepository\n\n\nclass RunnerService:\n\n    def __init__(self, app):\n        self.application = app\n        self.config = self.application.config['env_config']\n        self.sql_repo = SqlRepository(self.application)\n\n    def process_runner_file(self, uploaded_file, commiter, commit_hash,\n                            revision):\n        runner_file = self.process_received_runner_file(\n            self.config.UPLOAD_FOLDER,\n            uploaded_file,\n            commiter,\n            commit_hash)\n        runner_file.revision = revision\n        return runner_file\n\n    def create_runner(self, name, description, department, commiter,\n                      commit_hash, uploaded_file):\n        created = False\n        runner = self.sql_repo.get_runner_by_name_and_dept(name, department)\n        if not runner:\n            runner = Runner(name, description, department)\n            created = True\n        else:\n            self.update_runner_revision(runner)\n        runner_file = self.process_runner_file(\n                uploaded_file, commiter, commit_hash, runner.current_revision)\n        runner.files.append(runner_file)\n        self.sql_repo.create_or_update_runner(runner)\n        return runner, created\n\n    def update_runner_revision(self, runner):\n        revision = runner.current_revision\n        if runner.files and len(runner.files):\n            revision = max([runner_file.revision for runner_file in\n                            runner.files])\n        runner.current_revision = revision + 1\n\n    def process_received_runner_file(self, base_upload_folder, received_file,\n                                     commiter, commit_hash):\n        \"\"\"Process runner file\n        :param base_upload_folder:\n        :param received_file:\n        :return:\n        \"\"\"\n        folder_name = datetime.utcnow().strftime('%Y-%m-%d_%H_%M_%S_%f')\n        upload_dir_path = os.path.join(base_upload_folder, folder_name)\n        if not os.path.exists(upload_dir_path):\n            os.makedirs(upload_dir_path)\n        if received_file.filename == '':\n            raise Exception('Error: no file name')\n        filename = secure_filename(os.path.basename(received_file.filename))\n        runner_file = RunnerFile(commiter, commit_hash)\n        save_path = os.path.join(upload_dir_path, filename)\n        received_file.save(save_path)\n        runner_file.file_path = save_path\n        return runner_file\n",
            'abcd1234',
            'user@bi.com',
            '23-03-2020 15:43:21',
            1,
            '24-03-2020 15:48:22'

        );
    }
}